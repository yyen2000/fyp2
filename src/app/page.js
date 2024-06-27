import { getSession } from '../app/lib';
import HomePage from './home/homepage/page';

export default async function Home() {
  let cookies = await getSession();
  if(cookies != null) {
    
  }
  // const router = useRouter();
  // const [isAuthenticated, setIsAuthenticated] = useState(null);

  // useEffect(() => {
  //   const currentUser = document.cookie.split('; ').find(row => row.startsWith('currentUser='));

  //   if (currentUser) {
  //     setIsAuthenticated(true);
  //   } else {
  //     setIsAuthenticated(false);
  //     router.push('/sign-in');
  //   }
  // }, [router]);

  // if (isAuthenticated === null) {
  //   return <div>Loading...</div>; // Or a loading spinner

  // }

  return <HomePage />;
}
