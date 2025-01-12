'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { Island } from '../Island/Island';
import { Loading } from '../Loading/Loading';
import { NewTown } from '../NewTown/NewTown';
import { Shrimp } from '../Shrimp/Shrimp';
import { Test } from '../Test/Test';
import styles from './MainPage.module.css';
type spritePosition = {
  spriteX: number;
  spriteY: number;
};

type keysInput = {
  left: boolean;
  up: boolean;
  right: boolean;
  down: boolean;
};

type loadObjects = {
  island: boolean;
  test: boolean;
};

const left = 37 || 'a';
const up = 38 || 'w';
const right = 39 || 'd';
const down = 40 || 's';

const updateVar = (vars, value): any => {
  if (typeof document === 'undefined') return;
  return document.documentElement.style.setProperty(vars, value);
};

const MainPage: React.FunctionComponent = () => {
  const [input, setInput] = useState<keysInput>({
    left: false,
    up: false,
    right: false,
    down: false,
  });
  const [lastKey, setLastKey] = useState<string>('');

  const [moving, setMoving] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [mapsData, setMapsData] = useState<any>([]);

  const [pos, setPos] = useState<spritePosition>({
    spriteX: 684,
    spriteY: 546,
  });

  const [currentMap, setCurrentMap] = useState<any>([]);

  useEffect(() => {
    if (currentMap.length === 0) return;
    setPos({
      spriteX: currentMap.startPosition.x,
      spriteY: currentMap.startPosition.y,
    });
    updateVar('--shrimpX', pos.spriteX + 'px');
    updateVar('--shrimpY', pos.spriteY + 'px');
    setIsLoading(false);
    setTimeout(() => {
      setMoving(true);
    }, 1000);
  }, [currentMap]);

  const inputKey = (e: React.KeyboardEvent<HTMLElement>) => {
    if (!moving) return;
    if (e.keyCode === left && moving) {
      setInput({ ...input, left: true });
      setLastKey('left');
    } else if (e.keyCode === up && moving) {
      setInput({ ...input, up: true });
      setLastKey('up');
    } else if (e.keyCode === right && moving) {
      setInput({ ...input, right: true });
      setLastKey('right');
    } else if (e.keyCode === down && moving) {
      setInput({ ...input, down: true });
      setLastKey('down');
    }
  };

  const offPutKey = (e: React.KeyboardEvent<HTMLElement>) => {
    if (!moving) return;
    if (e.keyCode === left) {
      setInput({ ...input, left: false });
    } else if (e.keyCode === up) {
      setInput({ ...input, up: false });
    } else if (e.keyCode === right) {
      setInput({ ...input, right: false });
    } else if (e.keyCode === down) {
      setInput({ ...input, down: false });
    }
  };

  return (
    <main
      className={styles.main}
      tabIndex={0}
      onKeyDown={inputKey}
      onKeyUp={offPutKey}
    >
      <Loading isLoading={isLoading}></Loading>
      <section className={styles.screen}>
        <Shrimp
          pos={pos}
          setPos={setPos}
          input={input}
          setInput={setInput}
          currentMap={currentMap}
          mapsData={mapsData}
          setCurrentMap={setCurrentMap}
          setIsLoading={setIsLoading}
          setMoving={setMoving}
          lastKey={lastKey}
          moving={moving}
        />
        {currentMap.image && (
          <Image
            rel="preload"
            src={currentMap.image}
            alt="Map"
            className={styles.bg}
            priority
          />
        )}
        <Island
          setCurrentMap={setCurrentMap}
          setMapsData={setMapsData}
          currentMap={currentMap}
        ></Island>
        <NewTown setMapsData={setMapsData} currentMap={currentMap}></NewTown>
        <Test setMapsData={setMapsData} currentMap={currentMap}></Test>
        {Object.values(mapsData).map((component: any, i) => (
          <Image
            src={component.image}
            alt="cached"
            style={{ display: 'none' }}
            key={i}
            priority
          />
        ))}
      </section>
    </main>
  );
};
export { MainPage };
