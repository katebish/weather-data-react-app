import { capitalize } from 'lodash';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { PropTypes } from 'prop-types';

const CityCard = props => {
    const {
        name,
        description,
        temp,
        feelsLike,
        reloadError,
        deleteCity,
        reloadWeatherData
    } = props;

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant='h5'>
        {name}
        </Typography>
        <Typography color="text.secondary">
        {capitalize(description)}
        </Typography>
        <Typography color="text.secondary" variant="body2">
        {`Temp: ${temp}`}
        </Typography>
        <Typography color="text.secondary" variant="body2">
        {`Feels like: ${feelsLike}`}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="delete" onClick={deleteCity}>
            <DeleteIcon size="small"/>
        </IconButton>
        <IconButton aria-label="refresh" onClick={reloadWeatherData}>
            <RefreshIcon size="small"/>
        </IconButton>
        {reloadError && <Typography color="red">Failed to reload</Typography>}
      </CardActions>
    </Card>
  );
};

CityCard.defaultProps = {
    reloadError: false
};

CityCard.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    feelsLike: PropTypes.number.isRequired,
    reloadError: PropTypes.bool,
    deleteCity: PropTypes.func.isRequired,
    reloadWeatherData: PropTypes.func.isRequired
};

export default CityCard;

