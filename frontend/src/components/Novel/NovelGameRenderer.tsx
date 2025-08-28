// src/components/Novel/NovelGameRenderer.tsx（v7対応版）
import React, { useCallback } from 'react';
import { Container, Sprite, Text, Graphics } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { GameState } from './types/novel.types';

interface NovelGameRendererProps {
  gameState: GameState;
  currentText: string;
  currentSpeaker: string;
  isTyping: boolean;
  showChoices: boolean;
  choices: {id: string, text: string, next_step: string}[];
  onChoice: (choiceId: string, nextStepId: string) => void;
  gameWidth: number;
  gameHeight: number;
}

const NovelGameRenderer: React.FC<NovelGameRendererProps> = ({
  gameState,
  currentText,
  currentSpeaker,
  isTyping,
  showChoices,
  choices,
  onChoice,
  gameWidth,
  gameHeight
}) => {
  // キャラクター位置計算
  const getCharacterPosition = useCallback((position: 'left' | 'center' | 'right') => {
    switch (position) {
      case 'left':
        return { x: gameWidth * 0.2, y: gameHeight * 0.15 };
      case 'center':
        return { x: gameWidth * 0.5, y: gameHeight * 0.15 };
      case 'right':
        return { x: gameWidth * 0.8, y: gameHeight * 0.15 };
    }
  }, [gameWidth, gameHeight]);

  // テキストスタイル
  const speakerTextStyle = React.useMemo(() => new PIXI.TextStyle({
    fontFamily: ['Arial', 'sans-serif'],
    fontSize: 18,
    fill: '#ffffff',
    fontWeight: 'bold'
  }), []);

  const mainTextStyle = React.useMemo(() => new PIXI.TextStyle({
    fontFamily: ['Arial', 'sans-serif'],
    fontSize: 20,
    fill: '#ffffff',
    wordWrap: true,
    wordWrapWidth: gameWidth - 80,
    lineHeight: 32
  }), [gameWidth]);

  const choiceTextStyle = React.useMemo(() => new PIXI.TextStyle({
    fontFamily: ['Arial', 'sans-serif'],
    fontSize: 18,
    fill: '#ffffff',
    align: 'center'
  }), []);

  // テキストボックス背景描画関数
  const drawTextBoxBackground = useCallback((graphics: PIXI.Graphics) => {
    graphics.clear();
    graphics.beginFill(0x000000, 0.7);
    graphics.drawRoundedRect(20, 20, gameWidth - 40, 160, 10);
    graphics.endFill();
  }, [gameWidth]);

  // 話者名背景描画関数
  const drawSpeakerBackground = useCallback((graphics: PIXI.Graphics) => {
    graphics.clear();
    graphics.beginFill(0x4a90e2, 0.9);
    const nameWidth = Math.max(currentSpeaker.length * 24 + 20, 120);
    graphics.drawRoundedRect(0, 0, nameWidth, 35, 5);
    graphics.endFill();
  }, [currentSpeaker]);

  // 選択肢背景描画関数
  const createChoiceDrawFunction = useCallback((index: number) => {
    return (graphics: PIXI.Graphics) => {
      graphics.clear();
      graphics.beginFill(0x2c3e50, 0.9);
      graphics.drawRoundedRect(-200, -25, 400, 50, 10);
      graphics.lineStyle(2, 0x3498db);
      graphics.drawRoundedRect(-200, -25, 400, 50, 10);
      graphics.endFill();
    };
  }, []);

  return (
    <Container>
      {/* 背景 */}
      {gameState.currentBackground && (
        <Sprite
          image={gameState.currentBackground}
          width={gameWidth}
          height={gameHeight}
          anchor={0}
        />
      )}

      {/* キャラクター表示 */}
      {Object.entries(gameState.characterPositions).map(([position, character]) => {
        if (!character.visible) return null;
        
        const pos = getCharacterPosition(character.position);
        const imagePath = `/images/novel/characters/${character.name}/${character.expression}.png`;
        
        return (
          <Sprite
            key={`${character.name}-${position}`}
            image={imagePath}
            anchor={[0.5, 1]}
            x={pos.x}
            y={pos.y + gameHeight * 0.85}
            scale={0.8}
          />
        );
      })}

      {/* テキストボックス */}
      <Container y={gameHeight - 200}>
        {/* テキストボックス背景 */}
        <Graphics draw={drawTextBoxBackground} />
        
        {/* 話者名 */}
        {currentSpeaker && (
          <Container x={40} y={25}>
            <Graphics draw={drawSpeakerBackground} />
            <Text
              text={currentSpeaker}
              style={speakerTextStyle}
              x={10}
              y={8}
            />
          </Container>
        )}
        
        {/* メインテキスト */}
        <Text
          text={currentText}
          style={mainTextStyle}
          x={40}
          y={70}
        />
        
        {/* タイピング中のカーソル */}
        {isTyping && (
          <Text
            text="▼"
            style={new PIXI.TextStyle({
              fontSize: 16,
              fill: '#ffffff'
            })}
            x={gameWidth - 60}
            y={gameHeight - 60}
            alpha={0.8}
          />
        )}
      </Container>

      {/* 選択肢表示 */}
      {showChoices && (
        <Container x={gameWidth * 0.5} y={gameHeight * 0.5} anchor={0.5}>
          {choices.map((choice, index) => (
            <Container key={choice.id} y={index * 80}>
              <Graphics
                draw={createChoiceDrawFunction(index)}
                interactive={true}
                pointerdown={() => onChoice(choice.id, choice.next_step)}
                cursor="pointer"
              />
              <Text
                text={choice.text}
                style={choiceTextStyle}
                anchor={0.5}
              />
            </Container>
          ))}
        </Container>
      )}

      {/* 進行インジケーター */}
      {!showChoices && !isTyping && (
        <Container x={gameWidth - 80} y={gameHeight - 80}>
          <Graphics
            draw={(graphics) => {
              graphics.clear();
              graphics.beginFill(0xffffff, 0.8);
              graphics.drawPolygon([
                0, 0,
                20, 10,
                0, 20
              ]);
              graphics.endFill();
            }}
            alpha={0.7}
          />
        </Container>
      )}
    </Container>
  );
};

export default NovelGameRenderer;
