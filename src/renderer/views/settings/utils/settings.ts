import store from '../store';

export const onSwitchChange = (key: string, subkey?: string) => () => {
  if (!subkey) (store.settings as any)[key] = !(store.settings as any)[key];
  else
    (store.settings as any)[key][subkey] = !(store.settings as any)[key][
      subkey
    ];
  store.save();
};
