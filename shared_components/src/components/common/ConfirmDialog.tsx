import React from 'react';
import {
  createStyles,
  Theme,
  WithStyles,
  makeStyles,
  withStyles
} from '@material-ui/core/styles';
import {
  Dialog,
  Typography
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';

import { CustomButton, ContentText } from '../common';
import {
  TEXT_COLOR,
} from '../../common/styles';
/*
 * Styles
*/
const useStyles = makeStyles((theme: Theme) => ({

  margin: {
      marginBottom: 20,
      '@media screen and (max-width: 600px)': {
          marginBottom: 15,
      },
  },

  container: {
      '& .MuiPaper-root': {
          padding: '50px 57px',
          minWidth: 500,
          borderRadius: 12,
          borderColor: TEXT_COLOR.graylight,
          color: theme.palette.grey[900],
          margin: 27,     

          '@media screen and (max-width: 600px)': {
              padding: '30px',
              minWidth: 'auto',
          },
      },
  },

  content: {
      marginTop: 35,
      marginBottom: 35,
      fontSize: 20,
      lineHeight: 1.63,
      color: TEXT_COLOR.graylight,

      '@media screen and (max-width: 1280px)': {
          marginTop: 30,
          fontSize: 16,
          lineHeight: 1.4,
          marginBottom: 30,
      },

      '@media screen and (max-width: 600px)': {
          marginTop: 30,
          fontSize: 14,
          lineHeight: 1.4,
          marginBottom: 30,
      },
  },

  reopen: {
      marginRight: 10,
      minWidth: 100,
  },

  cancel: {
      marginBottom: 0,
      minWidth: 100,
  },

}));

/**
* Dialogue
*/
const styles = (theme: Theme) => createStyles({
  root: {
      margin: 0,
      padding: theme.spacing(0),
      display: 'flex',

      '@media screen and (max-width: 900px)': {
          fontSize: 16,
      },
      '@media screen and (max-width: 600px)': {
          fontSize: 14,
      },
  },

  title: {
      fontSize: 24,
      lineHeight: 1.2,
      fontWeight: 600,

      '@media screen and (max-width: 600px)': {
          fontSize: 22,
      },
  },

  closeButton: {
      position: 'absolute',
      right: 34,
      top: 35,
      color: TEXT_COLOR.graylight,

      '@media screen and (max-width: 1280px)': {
          right: 14,
      },

      '@media screen and (max-width: 600px)': {
          top: 20,
      },

      '& .MuiSvgIcon-root': {
          fontSize: '2.15rem',
          '@media screen and (max-width: 1280px)': {
              fontSize: '1.95rem',
          },
      }
  },
});

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, ...other } = props;
  return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
          <ContentText className={classes.title}>{children}</ContentText>
      </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
      padding: theme.spacing(0),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
      margin: 0,
      padding: theme.spacing(0),
  },
}))(MuiDialogActions);

/**
 * Main Component
 */

const ConfirmDialog = (props: any) => {
  const classes = useStyles();
  const { title, children, open, setOpen, onConfirm, cancelLabel, confirmLabel } = props;

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className={classes.container}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog"> {title || ""}</DialogTitle>
      <DialogContent className="">
      <Typography gutterBottom className={classes.content}>

        {children}
        </Typography>

        </DialogContent>
      <DialogActions>
        <CustomButton
                    label={cancelLabel || "No"}
                    className={classes.reopen}
                    onClick={() => setOpen(false)}
                    variant="outlined"
                />
                <CustomButton
                    label={confirmLabel || "Yes"}
                    className={classes.cancel}
                    onClick={() => {
                      setOpen(false);
                      onConfirm();
                    }}
                    variant="contained"
                />
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDialog;
