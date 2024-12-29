import React, { useEffect, useState } from 'react';

export function LoginBtn() {
  const [tgAuthResult, setTgAuthResult] = useState<string | null>(null);
  console.log('tgAuthResult: ', tgAuthResult);
  const a = decodeURIComponent(tgAuthResult ?? '');
  console.log('a: ', a);

  useEffect(() => {
    // Extract the tgAuthResult from the URL hash
    const urlHash = window.location.hash;
    console.log('urlHash: ', urlHash);
    const tgAuthResultParam = new URLSearchParams(urlHash.replace('#', '')).get(
      'tgAuthResult',
    );

    if (tgAuthResultParam) {
      setTgAuthResult(tgAuthResultParam);
    }
  }, []);

  const handleLogin = () => {
    const botId = '7696468458'; // Replace with your bot's ID
    const origin = encodeURIComponent('https://tapps-okidoki.vercel.app/'); // Your origin
    const returnTo = encodeURIComponent('https://tapps-okidoki.vercel.app/'); // Redirect URL after login
    const telegramUrl = `https://oauth.telegram.org/auth?bot_id=${botId}&origin=${origin}&request_access=write&return_to=${returnTo}`;
    window.location.href = telegramUrl;
    // window.open(telegramUrl); // Open Telegram login in a new tab
  };

  return (
    <button className="py-2" onClick={handleLogin}>
      Log in with Telegram
    </button>
  );
}
