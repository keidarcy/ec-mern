export const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  message: null
};

type Fields = keyof typeof initialState;

export const reducer = (
  state: typeof initialState,
  action: { id: Fields; value: string }
) => {
  return { ...state, [action.id]: action.value };
};
