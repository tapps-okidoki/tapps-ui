import React from 'react';

export function LoginBtn() {
  const handleLogin = () => {
    const botId = '7696468458'; // Replace with your bot's ID
    const origin = encodeURIComponent(`https://tapps-okidoki.vercel.app/`);
    const returnTo = encodeURIComponent(
      `https://tapps-okidoki.vercel.app/login-success`,
    );
    const telegramUrl = `https://oauth.telegram.org/auth?bot_id=${botId}&origin=${origin}&request_access=write&return_to=${returnTo}`;

    window.open(telegramUrl, '_blank');
  };
  return (
    <button className="py-2" onClick={handleLogin}>
      Log in
    </button>
  );
}
