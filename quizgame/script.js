const {
  colors,
  Divider,
  CssBaseline,
  ThemeProvider,
  Typography,
  Container,
  createMuiTheme,
  Box,
  Grid,
  makeStyles,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  FormRadioGroup,
  RadioGroup,
  Radio,
  Paper,
  styled,
  FormHelperText,
  CircularProgress,
  Backdrop,
  InputLabel,
  Select,
  MenuItem } =
MaterialUI;

// Create a theme instance.
const BlueRadio = styled(Radio)({
  color: "#3266a8",
  "&.Mui-checked": {
    color: "#32a87f" } });


const StyleContainer = styled(Box)({
  padding: "30px" });


const OuterContainer = styled(Box)({
  margin: "20px" });

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#556cd6" },

    secondary: {
      main: "#19857b" },

    error: {
      main: colors.red.A400 },

    background: {
      default: "#fff" } } });




const Question = ({ questionData, updateData, index, isSubmitted }) => {
  const handleChange = event => {
    const updatedData = { ...questionData, selectedAnswer: event.target.value };
    updateData(index, updatedData);
  };

  const answerList = questionData.randomAnswers.map((answer) => /*#__PURE__*/
  React.createElement(FormControlLabel, {
    value: answer,
    control: /*#__PURE__*/React.createElement(BlueRadio, null),
    label: /*#__PURE__*/React.createElement("div", { dangerouslySetInnerHTML: { __html: answer } }),
    disabled: isSubmitted }));


  return /*#__PURE__*/(
    React.createElement(OuterContainer, null, /*#__PURE__*/
    React.createElement(Paper, { elevation: 3 }, /*#__PURE__*/
    React.createElement(StyleContainer, null, /*#__PURE__*/
    React.createElement(Typography, { variant: "body1" }, /*#__PURE__*/
    React.createElement("div", { dangerouslySetInnerHTML: { __html: questionData.question } })), /*#__PURE__*/

    React.createElement(FormControl, {
      component: "fieldset",
      error:
      questionData.correct_answer &&
      questionData.correct_answer !== questionData.selectedAnswer }, /*#__PURE__*/


    React.createElement(RadioGroup, {
      "aria-label": "gender",
      name: "gender1",
      value: questionData.selectedAnswer,
      onChange: handleChange },

    answerList), /*#__PURE__*/

    React.createElement(FormHelperText, null,
    isSubmitted && (
    questionData.selectedAnswer &&
    questionData.selectedAnswer !== questionData.correct_answer ?
    "Wrong Answer, Correct Answer is" +
    " " +
    questionData.correct_answer :
    questionData.selectedAnswer &&
    questionData.selectedAnswer === questionData.correct_answer ?
    "Right Answer" :
    "")))))));






};
const getShuffledArr = arr => {
  const newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr;
};
const ScoreContainer = styled(Box)({
  padding: "20px",
  margin: "20px",
  backgroundColor: "#ebebeb",
  color: "#00299" });

const Score = ({ result, getQuestion }) => {
  return /*#__PURE__*/(
    React.createElement(Paper, { variant: "outlined" }, /*#__PURE__*/
    React.createElement(ScoreContainer, null, /*#__PURE__*/
    React.createElement(Typography, { color: "primary", variant: "h5", gutterBottom: true },
    "You Scored " + result + "%"), /*#__PURE__*/

    React.createElement(Button, { onClick: getQuestion, variant: "contained", color: "primary" }, "Restart"))));





};

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff" },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120 },

  selectEmpty: {
    marginTop: theme.spacing(2) } }));



const DropDowns = ({ numberOfQuestions, setNumberOfQuestions }) => {
  const classes = useStyles();
  const handleChange = event => {
    setNumberOfQuestions(event.target.value);
  };
  return /*#__PURE__*/(
    React.createElement(FormControl, { className: classes.formControl }, /*#__PURE__*/
    React.createElement(InputLabel, { id: "demo-simple-select-label" }, "Number of Questions"), /*#__PURE__*/
    React.createElement(Select, {
      labelId: "demo-simple-select-label",
      id: "demo-simple-select",
      value: numberOfQuestions,
      onChange: handleChange }, /*#__PURE__*/

    React.createElement(MenuItem, { value: 5 }, "Five"), /*#__PURE__*/
    React.createElement(MenuItem, { value: 10 }, "Ten"), /*#__PURE__*/
    React.createElement(MenuItem, { value: 15 }, "Fifteen"), /*#__PURE__*/
    React.createElement(MenuItem, { value: 20 }, "Twenty"), /*#__PURE__*/
    React.createElement(MenuItem, { value: 25 }, "Twenty-five"), /*#__PURE__*/
    React.createElement(MenuItem, { value: 30 }, "Thirty"), /*#__PURE__*/
    React.createElement(MenuItem, { value: 0 }, "Don't Crash or Overload your Computer"))));



};

const Categories = ({ categories, selectedCategory, setSelectedCategory }) => {
  const classes = useStyles();
  const handleChange = event => {
    setSelectedCategory(event.target.value);
  };
  console.log("categories", categories);
  const CategoryMenuList = categories.map((category, index) => /*#__PURE__*/
  React.createElement(MenuItem, { key: index, value: category.id },
  category.name));


  return /*#__PURE__*/(
    React.createElement(FormControl, { className: classes.formControl }, /*#__PURE__*/
    React.createElement(InputLabel, { id: "demo-simple-select-label" }, "Categories"), /*#__PURE__*/
    React.createElement(Select, {
      labelId: "demo-simple-select-label",
      id: "demo-simple-select",
      value: categories[selectedCategory],
      onChange: handleChange },

    CategoryMenuList)));



};

const Difficulty = ({ selectedDifficulty, setSelectedDifficulty }) => {
  const classes = useStyles();
  const handleChange = event => {
    setSelectedDifficulty(event.target.value);
  };
  return /*#__PURE__*/(
    React.createElement(FormControl, { className: classes.formControl }, /*#__PURE__*/
    React.createElement(InputLabel, { id: "demo-simple-select-label" }, "Difficulty"), /*#__PURE__*/
    React.createElement(Select, {
      labelId: "demo-simple-select-label",
      id: "demo-simple-select",
      value: selectedDifficulty,
      onChange: handleChange }, /*#__PURE__*/

    React.createElement(MenuItem, { value: "easy" }, "Easy"), /*#__PURE__*/
    React.createElement(MenuItem, { value: "medium" }, "Medium"), /*#__PURE__*/
    React.createElement(MenuItem, { value: "hard" }, "Hard"))));



};

const App = () => {
  const [data, setData] = React.useState([]);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = React.useState(10);
  const [categories, setCategories] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedDifficulty, setSelectedDifficulty] = React.useState("easy");
  const updateData = (index, newdata) => {
    const newDataArray = [...data];
    newDataArray[index] = newdata;
    setData(newDataArray);
  };

  React.useEffect(() => {
    console.log("categories is", categories);
  }, [categories]);

  React.useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const recievedCategores = await axios.get(
    "https://opentdb.com/api_category.php");

    setCategories(recievedCategores.data.trivia_categories);
  };
  const getQuestion = async () => {
    console.log("question is", data);
    setLoading(true);
    const response = await axios.get(
    "https://opentdb.com/api.php?amount=" +
    numberOfQuestions +
    "&difficulty=" +
    selectedDifficulty +
    "&category=" +
    selectedCategory);

    const formattedData = response.data.results.map(Problems => {
      const shuffledAnswer = getShuffledArr([
      ...Problems.incorrect_answers,
      Problems.correct_answer]);

      console.log(shuffledAnswer, "shuffledAnswer");
      return {
        ...Problems,
        randomAnswers: shuffledAnswer };

    });
    setData(formattedData);
    setLoading(false);
    setIsSubmitted(false);
  };
  React.useEffect(async () => {
    getQuestion();
  }, [numberOfQuestions, selectedCategory, selectedDifficulty]);
  const problemsList = data.map((problem, index) => /*#__PURE__*/
  React.createElement(Question, {
    questionData: problem,
    updateData: updateData,
    index: index,
    isSubmitted: isSubmitted }));


  const handleSubmit = () => {
    setIsSubmitted(true);
    window.scrollTo(0, 0);
  };
  const getScore = () => {
    const numberOfCorrect = data.filter(
    question => question.correct_answer === question.selectedAnswer).
    length;
    const totalNumberOfQuestions = data.length;
    return Math.round(numberOfCorrect / totalNumberOfQuestions * 100);
  };
  const classes = useStyles();
  return /*#__PURE__*/(
    React.createElement(Container, { component: "main", maxWidth: "md" }, /*#__PURE__*/
    React.createElement(Backdrop, { className: classes.backdrop, open: loading }, /*#__PURE__*/
    React.createElement(CircularProgress, { color: "inherit" })),

    isSubmitted && /*#__PURE__*/React.createElement(Score, { getQuestion: getQuestion, result: getScore() }), /*#__PURE__*/
    React.createElement(DropDowns, {
      numberOfQuestions: numberOfQuestions,
      setNumberOfQuestions: setNumberOfQuestions }), /*#__PURE__*/

    React.createElement(Difficulty, {
      selectedDifficulty: selectedDifficulty,
      setSelectedDifficulty: setSelectedDifficulty }), /*#__PURE__*/

    React.createElement(Categories, {
      categories: categories,
      selectedCategory: selectedCategory,
      setSelectedCategory: setSelectedCategory }),

    problemsList, /*#__PURE__*/
    React.createElement(Grid, { container: true, direction: "row", justify: "center", alignItems: "center" }, /*#__PURE__*/
    React.createElement(Button, {
      onClick: handleSubmit,
      disabled: isSubmitted,
      variant: "contained",
      color: "primary" }, "Submit"))));






};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.querySelector("#root"));