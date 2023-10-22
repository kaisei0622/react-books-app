import { useState, useRef } from "react";
import {
  Container,
  Fab,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";

const BookSearch = ({ books, setBooks }) => {
  const keyword = useRef("");
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();

  const search = async (keyword, e) => {
    e.preventDefault();
    const baseUrl = "https://www.googleapis.com/books/v1/volumes?";
    const params = { q: `intitle:${keyword.current.value}`, maxResults: 40 };
    const queryParams = new URLSearchParams(params);

    const response = await fetch(baseUrl + queryParams).then((response) =>
      response.json(),
    );
    console.log(response.items);

    // 必要な情報を配列にpush
    const newList = []; // 新しい配列作成
    response.items.forEach((book) => {
      // JSONで渡ってきた情報を Array.pushで配列に追加
      const title = book.volumeInfo.title;
      const img = book.volumeInfo.imageLinks;
      const description = book.volumeInfo.description;
      newList.push({
        title: title ? title : "",
        image: img ? img.thumbnail : "",
        description: description ? description.slice(0, 40) : "",
      });
      setSearchResult(newList);
    }); // ステートを更新
  };

  const addBook = (card) => {
    console.log(card);
    //booksがあれば最新のid + 1, なければ1
    const newId = books.length !== 0 ? books.slice(-1)[0].id + 1 : 1;
    // 読んだ日、メモも追加
    const newBook = {
      id: newId,
      title: card.title,
      description: card.description,
      image: card.image,
      readDate: ",memo:",
    };
    setBooks([...books, newBook]);
    navigate(`/edit/${newId}`); //更新後にリダイレクト
  };

  return (
    <>
      {/* 戻るボタン */}
      <Container component="section" maxWidth="x1">
        {/* Linkを指定 */}
        <Fab size="medium" component={Link} to={"/"} sx={{ mt: 1, m1: 1 }}>
          <ArrowBackIcon />
        </Fab>
      </Container>
      <Container component="section" maxWidth="lg">
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            本を検索
          </Typography>
          <Box
            component="form"
            onSubmit={(e) => search(keyword, e)}
            sx={{ mt: 1 }}
          >
            {/* refを使うにはinputRef */}
            <TextField
              required
              fullWidth
              label="book search"
              name="search"
              inputRef={keyword}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
              検索する
            </Button>
          </Box>
        </Box>
      </Container>
      <Container component="section" maxWidth="lg">
        <Grid container spacing={4}>
          {searchResult.map((card, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card sx={{ height: "100%" }}>
                {/* 画像用 */}
                <Grid item sm={4}>
                  <CardMedia
                    component="img"
                    image={card.image}
                    alt={card.title}
                  />
                </Grid>
                {/* テキスト用 */}
                <Grid item sm={8}>
                  <CardContent>
                    <Typography sx={{ fontSize: "16px" }}>
                      {card.title}
                    </Typography>
                    <Typography
                      sx={{ fontSize: "14px", mb: 1.5 }}
                      color="text.secondary"
                    >
                      {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Fab color="primary" onClick={() => addBook(card)}>
                      <AddIcon />
                    </Fab>
                  </CardActions>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default BookSearch;
