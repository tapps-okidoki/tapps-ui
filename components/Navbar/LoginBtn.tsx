import { ITelegramUserInfo } from '@tapps/types';
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export function LoginBtn() {
  const [telegramUser, setTelegramUser] = useState<ITelegramUserInfo | null>(
    null,
  );
  console.log('telegramUser: ', telegramUser);

  useEffect(() => {
    // Extract the tgAuthResult from the URL hash
    const urlHash = window.location.hash;
    const tgAuthResultParam = new URLSearchParams(urlHash.replace('#', '')).get(
      'tgAuthResult',
    );
    console.log('tgAuthResultParam: ', tgAuthResultParam);

    if (tgAuthResultParam) {
      console.log('tgAuthResultParam: ', tgAuthResultParam);
      try {
        const decoded: ITelegramUserInfo = jwtDecode(tgAuthResultParam, {
          header: true,
        }); // Cast to ITelegramUserInfo
        console.log('decoded: ', decoded);
        setTelegramUser(decoded); // Setting the decoded result directly
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const handleLogin = () => {
    const botId = '7696468458'; // Replace with your bot's ID
    const origin = encodeURIComponent('https://tapps-okidoki.vercel.app/'); // Your origin
    const returnTo = encodeURIComponent('https://tapps-okidoki.vercel.app/'); // Redirect URL after login
    const telegramUrl = `https://oauth.telegram.org/auth?bot_id=${botId}&origin=${origin}&request_access=write&return_to=${returnTo}`;
    window.open(telegramUrl); // Open Telegram login in a new tab
  };

  return telegramUser ? (
    <p className="py-2 font-semibold">@{telegramUser.username}</p>
  ) : (
    <button className="py-2" onClick={handleLogin}>
      Log in with Telegram
    </button>
  );
}
