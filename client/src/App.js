import AddBadgeForm from './components/AddBadgeForm';

import { Layout } from 'antd';
const { Content } = Layout;

function App() {
  return (
   
    <Content style={{ padding: '0 150px', background: 'white' }}>
      <AddBadgeForm />
    </Content>
 
  );
}
export default App;