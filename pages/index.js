import styles from '../styles/Home.module.css';
import { Nav } from 'react-bootstrap';
import { withUserSession } from "../actions/user";
import Logout from "../components/Logout";

export default function Home() {
  return (
    <div className={styles.container}>
      <Logout/>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Index Clinic Assignment
        </h1>
        <Nav>
          <Nav.Item>
            <Nav.Link href="/users"><h3>Users</h3></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/posts"><h3>Posts</h3></Nav.Link>
          </Nav.Item>
        </Nav>
      </main>
    </div>
  )
}

export const getServerSideProps = withUserSession();
