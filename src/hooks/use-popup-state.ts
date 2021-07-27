/* eslint-disable @typescript-eslint/naming-convention */
import { useState, useMemo } from 'react';

export interface Actions<T = boolean, U = State> {
  open: (value: U) => void;
  close: () => void;
  setState: (value: U) => void;
  toggle: (value: T) => void;
}

export interface State extends Record<string, unknown> {
  visible?: boolean;
}

function usePopupState<T extends State = State>(defaultValue?: T): [T, Actions<boolean, T>] {
  const [state, _setState] = useState<T>({ visible: false, ...defaultValue });

  const actions = useMemo(() => {
    const setState = (props: T) => {
      Object.assign(state, props);
      _setState({ ...state });
    };

    // 切换是否显示
    const toggle = (visible: boolean) => {
      state.visible = visible;
      setState(state);
    };

    const open = (props: T) => {
      setState(props);
      toggle(true);
    };

    const close = () => toggle(false);

    return {
      setState,
      toggle,
      open,
      close,
    };
  }, [defaultValue]);

  return [state, actions];
}

export default usePopupState;
