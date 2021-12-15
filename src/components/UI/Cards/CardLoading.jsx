/* eslint-disable linebreak-style */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import {
  Card, CardContent, CardActionArea, Box, Skeleton,
} from '@mui/material';
// eslint-disable-next-line import/no-named-as-default

export default function CardLoading() {
  return (
    <>
      <Card sx={{
        width: 660, height: 400, margin: 8, borderRadius: 7,
      }}
      >
        <CardActionArea
          sx={{
            width: 660, height: 400, borderRadius: 7,
          }}
        >
          <Skeleton sx={{ height: '70%' }} animation="wave" variant="rectangular" />

          <CardContent sx={{
            height: '30%', display: 'flex', width: '100%', alignItems: 'center', padding: '0px 10%',
          }}
          >
            <Skeleton animation="wave" variant="circular" width={50} height={50} />
            <Box sx={{
              display: 'flex', flexDirection: 'column', paddingLeft: 3, width: '50%',
            }}
            >
              <Skeleton animation="wave" height={10} />
              <Skeleton animation="wave" height={10} width="40%" />
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
