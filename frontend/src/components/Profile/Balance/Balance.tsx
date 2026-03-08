import { useState } from 'react';
import { updateBalance } from '../../../services/userService.ts';
import { useAuth } from '../../../context/AuthContext.tsx';

export default function Balance() {
    const [amount, setAmount] = useState<number | ''>('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
    const { updateUser } = useAuth();

    const handleAddBalance = async () => {
        if (!amount || amount <= 0) {
            setMessage({ text: 'Please enter a valid positive amount.', type: 'error' });
            return;
        }

        setIsLoading(true);
        setMessage(null);

        try {
            const updatedUser = await updateBalance({ amount: Number(amount) });
            updateUser(updatedUser);
            setMessage({ text: `Success! New balance is: $${updatedUser.balance.toFixed(2)}`, type: 'success' });
            setAmount('');
        } catch (err: any) {
            setMessage({ text: 'Failed to update balance. Please try again.', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Add Balance</h2>
            <div>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="Enter amount"
                    min="1"
                />
                <button onClick={handleAddBalance} disabled={isLoading}>
                    {isLoading ? 'Processing...' : 'Add Funds'}
                </button>
            </div>
            {message && (
                <p style={{ color: message.type === 'success' ? 'green' : 'red'}}>
                    {message.text}
                </p>
            )}
        </div>
    );
}