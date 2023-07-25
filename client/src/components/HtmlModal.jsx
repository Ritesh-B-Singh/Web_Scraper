import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '80vw',
  wordWrap: 'break-word',
  maxHeight: '80vh',
  height: '80vh',
  bgcolor: '#ffffff',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  overflow: 'auto',
  padding: '1rem'
}

const headerStyle = {
  padding: '16px',
  borderBottom: '1px solid #f0f0f0',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.5rem'
}

export default function HtmlModal({ text, url }) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const createMarkup = (html) => {
    return { __html: html }
  }

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={headerStyle}>
            <Typography variant="h6" component="h2">
              {' '}
              Website:{' '}
            </Typography>
            <Typography variant="h6" component="h2" color="primary">
              {url}
            </Typography>
          </Box>
          <div
            style={{ padding: '1rem' }}
            dangerouslySetInnerHTML={createMarkup(text)}
          />
        </Box>
      </Modal>
    </div>
  )
}
