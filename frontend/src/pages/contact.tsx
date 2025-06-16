import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout/Layout';
import SEOHead from '../components/SEO/SEOHead';
import styles from '../styles/Contact.module.css';

interface FormData {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const Contact: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');

  // バリデーション関数
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'お名前は必須項目です';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスは必須項目です';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = '件名は必須項目です';
    }

    if (!formData.category) {
      newErrors.category = 'お問い合わせ種別を選択してください';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'お問い合わせ内容は必須項目です';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'お問い合わせ内容は10文字以上で入力してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // フォーム送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          category: '',
          message: ''
        });
      } else {
        setSubmitError(result.message || '送信中にエラーが発生しました。');
      }
    } catch (error) {
      console.error('送信エラー:', error);
      setSubmitError('送信中にエラーが発生しました。しばらく後でもう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 入力値変更処理
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // エラーがある場合はクリア
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // 送信エラーもクリア
    if (submitError) {
      setSubmitError('');
    }
  };

  if (isSubmitted) {
    return (
      <>
        <SEOHead
          title="お問い合わせ完了 | ゲーム賛否"
          description="お問い合わせありがとうございました。"
        />
        <Layout>
          <div className={styles.container}>
            <div className={styles.successContainer}>
              <div className={styles.successIcon}>✅</div>
              <h1 className={styles.successTitle}>お問い合わせありがとうございました</h1>
              <p className={styles.successMessage}>
                お問い合わせを正常に受け付けました。<br />
                contact@gamesanpi.com に送信されました。<br />
                3営業日以内にご返信いたします。
              </p>
              <button 
                className={styles.homeButton}
                onClick={() => router.push('/')}
              >
                ホームに戻る
              </button>
            </div>
          </div>
        </Layout>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="お問い合わせ | ゲーム賛否"
        description="ゲーム賛否に関するお問い合わせ、ご意見、取材依頼はこちらからお送りください。3営業日以内にご返信いたします。"
        keywords={['お問い合わせ', 'ゲーム賛否', '取材依頼', 'ご意見', 'サポート']}
        canonicalUrl="https://gamesanpi.com/contact"
      />
      <Layout>
        <div className={styles.container}>
          <div className={styles.contactContent}>
            <div className={styles.heroSection}>
              <h1 className={styles.pageTitle}>お問い合わせ</h1>
              <p className={styles.heroText}>
                ご質問・ご意見・取材依頼等、お気軽にお問い合わせください
              </p>
            </div>

            <div className={styles.formSection}>
              <div className={styles.formContainer}>
                {submitError && (
                  <div className={styles.errorAlert}>
                    <span className={styles.errorIcon}>⚠️</span>
                    {submitError}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className={styles.contactForm}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>
                      お名前 <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`${styles.input} ${errors.name ? styles.error : ''}`}
                      placeholder="山田太郎"
                    />
                    {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                      メールアドレス <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`${styles.input} ${errors.email ? styles.error : ''}`}
                      placeholder="example@example.com"
                    />
                    {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="category" className={styles.label}>
                      お問い合わせ種別 <span className={styles.required}>*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`${styles.select} ${errors.category ? styles.error : ''}`}
                    >
                      <option value="">選択してください</option>
                      <option value="general">一般的なお問い合わせ</option>
                      <option value="press">取材・プレスリリース</option>
                      <option value="partnership">提携・コラボレーション</option>
                      <option value="feedback">サイトへのご意見・ご要望</option>
                      <option value="technical">技術的な問題</option>
                      <option value="advertisement">広告掲載について</option>
                      <option value="other">その他</option>
                    </select>
                    {errors.category && <span className={styles.errorMessage}>{errors.category}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="subject" className={styles.label}>
                      件名 <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`${styles.input} ${errors.subject ? styles.error : ''}`}
                      placeholder="お問い合わせの件名を入力してください"
                    />
                    {errors.subject && <span className={styles.errorMessage}>{errors.subject}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message" className={styles.label}>
                      お問い合わせ内容 <span className={styles.required}>*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`${styles.textarea} ${errors.message ? styles.error : ''}`}
                      placeholder="お問い合わせ内容を詳しくお書きください（10文字以上）"
                      rows={8}
                    />
                    {errors.message && <span className={styles.errorMessage}>{errors.message}</span>}
                  </div>

                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className={styles.spinner}></span>
                        送信中...
                      </>
                    ) : (
                      '送信する'
                    )}
                  </button>
                </form>
              </div>

              <div className={styles.infoSection}>
                <div className={styles.infoCard}>
                  <h3 className={styles.infoTitle}>お問い合わせについて</h3>
                  <div className={styles.infoContent}>
                    <div className={styles.infoItem}>
                      <strong>📧 連絡先:</strong>
                      <p>contact@gamesanpi.com</p>
                    </div>
                    <div className={styles.infoItem}>
                      <strong>📅 返信時期:</strong>
                      <p>3営業日以内にご返信いたします</p>
                    </div>
                    <div className={styles.infoItem}>
                      <strong>📝 取材依頼:</strong>
                      <p>プレスリリースや取材依頼も承っております</p>
                    </div>
                  </div>
                </div>

                <div className={styles.infoCard}>
                  <h3 className={styles.infoTitle}>運営情報</h3>
                  <div className={styles.infoContent}>
                    <div className={styles.infoItem}>
                      <strong>サイト名:</strong>
                      <p>ゲーム賛否</p>
                    </div>
                    <div className={styles.infoItem}>
                      <strong>URL:</strong>
                      <p>https://gamesanpi.com</p>
                    </div>
                    <div className={styles.infoItem}>
                      <strong>管理人:</strong>
                      <p>Miyatake</p>
                    </div>
                    <div className={styles.infoItem}>
                      <strong>運営開始:</strong>
                      <p>2025年6月</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Contact;