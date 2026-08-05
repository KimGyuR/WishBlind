import Login from './screens/Login';
import Home from './screens/Home';
import GiftStep1 from './screens/GiftStep1';
import GiftStep2 from './screens/GiftStep2';
import GiftStep3 from './screens/GiftStep3';
import GiftStep4 from './screens/GiftStep4';
import InviteConfirm from './screens/InviteConfirm';
import TasteTest1 from './screens/TasteTest1';
import TasteTest2 from './screens/TasteTest2';
import TasteTest3 from './screens/TasteTest3';
import TasteTest4 from './screens/TasteTest4';
import TasteTest5 from './screens/TasteTest5';
import TasteComplete from './screens/TasteComplete';
import AIResults from './screens/AIResults';
import AIDetail from './screens/AIDetail';
import GiftDelivery from './screens/GiftDelivery';
import { useState } from 'react';

export default function App() {
  const [page, setPage] = useState('login');

  const nav = (p) => setPage(p);

  const screens = {
    login: <Login navigate={nav} />,
    home: <Home navigate={nav} />,
    'gift-step1': <GiftStep1 navigate={nav} />,
    'gift-step2': <GiftStep2 navigate={nav} />,
    'gift-step3': <GiftStep3 navigate={nav} />,
    'gift-step4': <GiftStep4 navigate={nav} />,
    'invite-confirm': <InviteConfirm navigate={nav} />,
    'taste-1': <TasteTest1 navigate={nav} />,
    'taste-2': <TasteTest2 navigate={nav} />,
    'taste-3': <TasteTest3 navigate={nav} />,
    'taste-4': <TasteTest4 navigate={nav} />,
    'taste-5': <TasteTest5 navigate={nav} />,
    'taste-complete': <TasteComplete navigate={nav} isSender={false} />,
    'taste-complete-sender': <TasteComplete navigate={nav} isSender={true} />,
    'ai-results': <AIResults navigate={nav} />,
    'ai-detail': <AIDetail navigate={nav} />,
    'gift-delivery': <GiftDelivery navigate={nav} />,
  };

  return (
    <div className="phone-frame">
      {screens[page] ?? screens['login']}
    </div>
  );
}
