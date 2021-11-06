import { FormEvent, useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { withSSRGuest } from '../utils/withSSRGuest';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useAuthContext();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      email,
      password
    };

    await signIn(data);
  }

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1>Next Auth</h1>
        
        <input
          type="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />

        <input
          type="password"
          value={password}
          onChange={event=> setPassword(event.target.value)}
        />

        <button type="submit">Entrar</button>
      </form>
    </main>
  )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
});
