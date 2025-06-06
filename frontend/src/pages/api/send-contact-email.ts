import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';  // 追加: nodemailerのimport

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
}

interface EmailResponse {
  success: boolean;
  message: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EmailResponse>
) {
  // POST メソッドのみ許可
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Only POST requests are accepted.',
    });
  }

  try {
    const { name, email, subject, category, message }: ContactFormData = req.body;

    // バリデーション
    if (!name || !email || !subject || !category || !message) {
      return res.status(400).json({
        success: false,
        message: '必須項目が入力されていません。',
      });
    }

    // メールアドレスの簡単なバリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: '有効なメールアドレスを入力してください。',
      });
    }

    // メッセージの長さチェック
    if (message.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'お問い合わせ内容は10文字以上で入力してください。',
      });
    }

    console.log('Contact form submission received:', {
      name,
      email,
      subject,
      category,
      messageLength: message.length,
    });

    // メール送信処理（Nodemailer使用）
    await sendContactEmail({
      name,
      email,
      subject,
      category,
      message,
    });

    // 成功レスポンス
    res.status(200).json({
      success: true,
      message: 'お問い合わせを正常に送信しました。3営業日以内にご返信いたします。',
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    res.status(500).json({
      success: false,
      message: 'サーバーエラーが発生しました。しばらく後でもう一度お試しください。',
      error: process.env.NODE_ENV === 'development' ? String(error) : undefined,
    });
  }
}

// メール送信関数
async function sendContactEmail(data: ContactFormData) {
  //const nodemailer = require('nodemailer');

  // SMTPトランスポーターの設定
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // カテゴリの日本語変換
  const getCategoryName = (category: string): string => {
    const categoryMap: { [key: string]: string } = {
      'general': '一般的なお問い合わせ',
      'press': '取材・プレスリリース',
      'partnership': '提携・コラボレーション',
      'feedback': 'サイトへのご意見・ご要望',
      'technical': '技術的な問題',
      'advertisement': '広告掲載について',
      'other': 'その他',
    };
    return categoryMap[category] || category;
  };

  // メール本文の作成
  const emailBody = `
【ゲーム賛否】新しいお問い合わせが届きました

■ お問い合わせ情報
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

お名前: ${data.name}
メールアドレス: ${data.email}
件名: ${data.subject}
お問い合わせ種別: ${getCategoryName(data.category)}

■ お問い合わせ内容
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${data.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

送信日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}
送信元IP: ${process.env.VERCEL_URL ? 'Vercel' : 'localhost'}

※ このメールは自動送信されています。
※ ご返信は3営業日以内を目安に行います。
`;

  // メール送信
  const mailOptions = {
    from: `"ゲーム賛否 お問い合わせフォーム" <${process.env.SMTP_FROM_EMAIL}>`,
    to: 'contact@gamesanpi.com',
    subject: `【ゲーム賛否】${getCategoryName(data.category)} - ${data.subject}`,
    text: emailBody,
    replyTo: data.email, // 返信先を送信者のメールアドレスに設定
  };

  await transporter.sendMail(mailOptions);
  
  console.log('Contact email sent successfully to contact@gamesanpi.com');
}
