export default function ({ store, redirect }: { store: any; redirect: any }) {
  // ユーザーがログイン済みの場合、ホームページにリダイレクトする
  if (store.state.auth.loggedIn) {
    return redirect('/');
  }
}
