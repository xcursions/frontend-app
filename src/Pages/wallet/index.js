// import Link from 'next/link';
// import FullButton from '@/ui-components/FullButton';
// import Input from '@/ui-components/Input';
// import Logo from '@/ui-components/Logo';
import styles from './login.module.css';

const Wallet = () => {
  return (
    <div className={styles.container}>
      <p>Welcome to wallet</p>
      {/* <section className={styles['login-container']}>
        <div className={styles['brand-container']}>
          <Logo />
          <div className={styles['logo-explain']}>AIO Dashboard</div>
        </div>
        <div className={styles['form-container']}>
          <div className="t-center" style={{ margin: '15px 0' }}>
            <div className={styles['sm-brand-container']}>
              <Logo />
            </div>
            <h1>Login</h1>
            <p>Please enter email and password to login</p>
          </div>
          <div>
            <Input
              inputContainerStyle={{ padding: '15px 30px' }}
              type="text"
              placeholder="Email"
              onChange={(e) => console.log(e)}
              name="email"
              label={'Email'}
            />
            <Input
              inputContainerStyle={{ padding: '15px 30px' }}
              type="password"
              placeholder="Password"
              onChange={(e) => console.log(e)}
              name="email"
              label={'Email'}
            />
            <FullButton label={'Login'} />

            <p className="tc-grey t-center">
              Dont have an account?{' '}
              <Link className="link" href={`/signup`}>
                Signup for free
              </Link>
            </p>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Wallet;
