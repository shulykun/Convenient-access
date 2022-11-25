import React, {
  FC,
  memo,
  useReducer,
  useRef,
  useEffect,
} from "react";
import {
  createSmartappDebugger,
  createAssistant,
  AssistantAppState,
} from "@sberdevices/assistant-client";
import "./App.css";
import { Button, Image } from '@salutejs/plasma-ui';
import { headline2} from '@salutejs/plasma-tokens';
import task from './assets/task.png'
import ListItem from "./components/list-item/ListItem";
import { reducer } from "./store";

const initializeAssistant = (getState: any) => {
  if (process.env.NODE_ENV === "development") {
    console.log(getState)
    return createSmartappDebugger({
      token: process.env.REACT_APP_TOKEN ?? "",
      initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
      getState,
    });
  }

  return createAssistant({ getState });
};

export const App: FC = memo(() => {
  //const [appState, dispatch] = useReducer(reducer, { notes: [] });
  const list = [
    {
      title: "Пользоваться всеми сервисами в одном приложении",
      subtitle: "Инвестициями, пенсиями и страховками"
    },
    {
      title: "Входить с помощью Сбер ID",
      subtitle: "И получать доступ к возможностям экосистемы Сбера"
    },
    {
      title: "Получить персональные предложения",
      subtitle: "И скидки от партнеров Сбера"
    },
  ]

  const assistantStateRef = useRef<AssistantAppState>();
  const assistantRef = useRef<ReturnType<typeof createAssistant>>();

  useEffect(() => {
    assistantRef.current = initializeAssistant(() => assistantStateRef.current);

    // assistantRef.current.on("data", ({ action }: any) => {
    //   if (action) {
    //     dispatch(action);
    //   }
    // });
  }, []);

  return (
    <main className="container">
      <Image
        src={task}
        width="180px"
        height="180px"
        alt="Картинка для примера"
      />
      <h2 style={headline2}>
        Бесплатная услуга
        <br />
        "Удобный доступ"
      </h2>
      <div style={{ display: "flex", flexDirection: "column", }}>
        {
          list.map((item, index) =>
            <ListItem key={index} index={index + 1} title={item.title} subtitle={item.subtitle} />
          )
        }
        <Button text="Узнать больше и управлять" size="m" view="primary" />
        <p >
          После перехода Вы получите дополнительные сведения и расширенную информацию об услуге
        </p>
      </div>
    </main>
  );
});
