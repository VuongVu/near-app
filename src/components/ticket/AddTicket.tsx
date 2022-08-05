import { memo } from 'react';
import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import type { Ticket } from 'utils/near/useTicket';
import clsx from 'clsx';

interface AddTicketProps {
    open: boolean;
    loading: boolean;
    onSubmit: (newTicket: Ticket) => void;
    onClose: () => void;
}

const addTicketSchema = yup
    .object({
        name: yup.string().required(),
        description: yup.string().required(),
        image: yup.string().required(),
        price: yup.number().positive().required(),
        remaining: yup.number().positive().required(),
    })
    .required();

function AddTicket({ open, loading, onSubmit, onClose }: AddTicketProps) {
    const { register, handleSubmit, reset } = useForm<Ticket>({
        mode: 'onChange',
        resolver: yupResolver(addTicketSchema),
    });

    const handleAddTicket = handleSubmit(data => {
        onSubmit(data);
    });

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <Dialog open={open} onClose={() => null} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="card w-full max-w-[500px] bg-base-100 shadow-2xl">
                    <form onSubmit={handleAddTicket} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" className="input input-bordered" {...register('name')} />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <input type="text" className="input input-bordered" {...register('description')} />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Image</span>
                            </label>
                            <input type="text" className="input input-bordered" {...register('image')} />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input
                                type="number"
                                onKeyDown={e => {
                                    if (e.key === '-' || e.key === '+') {
                                        e.preventDefault();
                                    }
                                }}
                                className="input input-bordered"
                                {...register('price')}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Total</span>
                            </label>
                            <input
                                type="number"
                                onKeyDown={e => {
                                    if (e.key === '-' || e.key === '+') {
                                        e.preventDefault();
                                    }
                                }}
                                className="input input-bordered"
                                {...register('remaining')}
                            />
                        </div>
                        <div className="form-control mt-6 grid grid-cols-2 gap-x-2">
                            <button
                                onClick={handleClose}
                                type="button"
                                className={clsx('btn btn-ghost', {
                                    'btn-disabled': loading,
                                })}>
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className={clsx('btn btn-primary', {
                                    'btn-disabled loading': loading,
                                })}>
                                {loading ? 'Loading' : 'Submit'}
                            </button>
                        </div>
                    </form>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}

export default memo(AddTicket);
