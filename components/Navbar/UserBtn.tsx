import { useCloseOnOutsideClickOrEsc } from '@tapps/hooks/useCloseOnOutsideClickOrEsc';
import React, { useState } from 'react';

interface Props {
  username: string;
}

export function UserBtn({ username }: Props) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const closeUserPopover = () => {
    setIsPopoverOpen(false);
  };

  const userPopoverRef =
    useCloseOnOutsideClickOrEsc<HTMLDivElement>(closeUserPopover);

  const handleOnLogout = () => {
    localStorage.removeItem('T_USER');
    window.location.reload();
  };

  return (
    <div className="relative inline-block text-left">
      {/* Button to toggle the popover */}
      <button
        onClick={() => setIsPopoverOpen((prev) => !prev)}
        className="py-2 font-semibold"
      >
        {username}
      </button>

      {/* Popover content */}
      {isPopoverOpen && (
        <div
          ref={userPopoverRef}
          className="absolute -bottom-[100%] right-0 z-10 mt-2 rounded-lg border border-tapps-gray bg-tapps-black shadow-lg"
        >
          <button
            className="cursor-pointer whitespace-nowrap px-4 py-2 text-tapps-white hover:text-tapps-blue"
            onClick={handleOnLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
