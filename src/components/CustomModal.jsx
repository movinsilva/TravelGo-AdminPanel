import React from 'react'
import { Dialog, Button, DialogTitle, DialogActions, DialogContent, DialogContentText, Slide } from '@mui/material'
import successGif from 'assets/success.gif';

const CustomModal = ({open, handleClose,handleNo, title, content}) => {

  return (
    <Dialog
    open={open}
    keepMounted
    onClose={handleNo}
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">
        {content}
      </DialogContentText> 
    </DialogContent>
    <DialogActions sx={{ margin: '5%'}}>
    <Button variant='contained' color='secondary' onClick={handleNo}>Disagree</Button>
      <Button variant='contained' color='error' onClick={handleClose}>Agree</Button>
    </DialogActions>
  </Dialog>
  )
}

export default CustomModal