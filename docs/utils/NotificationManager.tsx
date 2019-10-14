import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import notifications from '../notifications.json';
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  notificationContainer: {
    '& > p': {
      margin: 4,
    },
  },
});

export function useNotification() {
  const styles = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    const viewedNotifications: string[] = JSON.parse(
      localStorage.getItem('viewedNotifications') || '[]'
    );

    const notificationToShow = notifications.find(
      notification => !viewedNotifications.some(viewedId => viewedId === notification.id)
    );

    if (notificationToShow) {
      enqueueSnackbar(
        <ReactMarkdown
          className={styles.notificationContainer}
          source={notificationToShow.title}
        />,
        {
          autoHideDuration: 1000008,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        }
      );

      localStorage.setItem(
        'viewedNotifications',
        JSON.stringify([...viewedNotifications, notificationToShow.id])
      );
    }
  }, [enqueueSnackbar, styles.notificationContainer]);
}

export const NotificationManager: React.FC = () => {
  useNotification();
  return null;
};
