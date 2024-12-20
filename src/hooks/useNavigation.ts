import NavigationContext from '@/contexts/NavigationProvider';
import { useContext } from 'react';

const useNavigation = () => useContext(NavigationContext);

export default useNavigation;
