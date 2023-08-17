import { useQuery, gql } from "@apollo/client";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { QueryResponse } from "@/src/interfaces/Characters";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export default function SearchAppBar() {
  const GET_HUMANS = gql`
    query {
      humanCharacters {
        name
        status
        species
        gender
      }
    }
  `;
  const { loading, error, data } = useQuery<QueryResponse>(GET_HUMANS);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              Menu
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              MUI
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Container maxWidth="sm">
        {loading && <CircularProgress sx={{ marginTop: 20 }} />}
        {error ? (
          <Typography color={"red"} mt={15} fontSize={20}>
            Hubo un error
          </Typography>
        ) : (
          <div>
            <Typography variant="h4" gutterBottom>
              Human Characters from Rick and Morty
            </Typography>
            <List>
              {data?.humanCharacters?.map((character) => (
                <ListItem key={character.name}>
                  <ListItemText
                    primary={character.name}
                    secondary={`Species: ${character.species} | Status: ${character.status}`}
                  />
                </ListItem>
              ))}
            </List>
          </div>
        )}
      </Container>
    </>
  );
}
