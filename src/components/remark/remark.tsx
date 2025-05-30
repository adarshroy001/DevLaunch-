import { useState } from 'react';

export default function AddRemark() {
    const [remark, setRemark] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!remark.trim()) return;

        // Here you would typically send the remark to your backend
        console.log('Submitted remark:', remark);
        alert('Thank you for your remark!');
        setRemark('');
    };

    return (
        <div className="max-w-full mx-auto p-2 bg-white rounded-lg shadow-md mt-4">
            <h3 className="text-lg font-medium  text-red-400 w-fit px-3 py-0 mb-2 rounded-full">Remark</h3>
            <div className='flex justify-between pb-2 items-center w-full'>
                <form onSubmit={handleSubmit} className="space-y-0 w-4/5">

                    <input
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-full "
                        placeholder="Share your experience..."
                        required
                    />

                </form>
                <div className="min-w-48 w-1/5 flex justify-end pr-3">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors "
                    >
                        Submit Remark
                    </button>
                </div>
            </div>

        </div>
    );
}