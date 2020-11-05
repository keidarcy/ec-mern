export const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  message: null,
  isAdmin: false
};

type Fields = keyof typeof initialState;

export const reducer = (
  state: typeof initialState,
  action: { id: Fields; value: string | boolean }
) => {
  return { ...state, [action.id]: action.value };
};
