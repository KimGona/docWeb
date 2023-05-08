import Dialog from '@mui/material/Dialog';

export default function SimpleDialog({open, handleClose, title, children}) {
    return (
        <Dialog onClose={handleClose} open={open}>
            <div className='py-8 px-10'>
                <p className='text-xl font-medium pb-4'>{title}</p>
                {children}
            </div>
        </Dialog>
    );
};