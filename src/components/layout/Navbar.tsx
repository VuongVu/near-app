import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import toNumber from 'lodash/toNumber';

import useNearApp from 'utils/near/useNearApp';
import getErrorMessage from 'utils/getErrorMessage';

export default function Navbar() {
    const { login, logout, getAccountId, getAccountBalance } = useNearApp();
    const account = getAccountId();

    const [balance, setBalance] = useState(0);

    useEffect(() => {
        if (account) {
            getAccountBalance()
                .then(rs => {
                    setBalance(toNumber(rs));
                })
                .catch(error => {
                    toast(getErrorMessage(error), { type: 'error' });
                });
        }
    }, [account, getAccountBalance]);

    return (
        <div className="navbar bg-base-100 px-10">
            <div className="flex-1">
                <p className="text-xl normal-case">Near App</p>
            </div>
            <div className="flex-none">
                {account ? (
                    <a
                        href={`https://explorer.testnet.near.org/accounts/${account}`}
                        target="_blank"
                        className="flex items-center gap-4"
                        rel="noreferrer noopener">
                        <p>{balance}Ⓝ</p>
                        <button onClick={logout} type="button" className="btn btn-outline btn-primary btn-sm">
                            Logout
                        </button>
                    </a>
                ) : (
                    <button onClick={login} type="button" className="btn btn-outline btn-primary btn-sm">
                        Connect wallet
                    </button>
                )}
            </div>
        </div>
    );
}
