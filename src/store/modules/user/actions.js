export function registroPessoaRequest(data) {
  return {
    type: '@user/REGISTRO_PESSOA_REQUEST',
    payload: { data },
  };
}

export function registroPessoaSuccess() {
  return {
    type: '@user/REGISTRO_PESSOA_SUCCESS',
  };
}

export function registroPessoaFailure() {
  return {
    type: '@user/REGISTRO_PESSOA_FAILURE',
  };
}
