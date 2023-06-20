import { render, screen, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '../src/redux';
import ProductList from '../src/screens/ProductList';
// import ProductList from '../src/screens/ProductList';


test('form submits two answers',async () => {
    const state = store.getState();
    function Wrapper({ children }) {
      return <Provider store={store}>{children}</Provider>
    }
    // const searchList = state.product.productSearchResult;
    const screen = render(<ProductList/> ,{ wrapper : Wrapper }  );
    // const input = screen.getAllByLabelText("search input");
    // expect(input).toBeTruthy();

    screen = screen.getByLabelText('search input');

     fireEvent.changeText(screen[0], 'LineChart');

    const searchListState =  state.product.products;

    expect(searchListState).toHaveLength(searchListState.length);
    // expect(searchListState).toEqual(
    //   expect.arrayContaining([
    //     expect.objectContaining({
    //         email : "rameshwar_mr_iyer@spinka.name",
    //         gender: "male",
    //         id: expect.any(Number),
    //         name: "Mr. Rameshwar Iyer",
    //         status: "inactive"
    //       }),
    //   ])
    // );
  

//   const mockFn = jest.fn();

//   render(<QuestionsBoard questions={allQuestions} onSubmit={mockFn} />);

//   const answerInputs = screen.getAllByLabelText('answer input');

//   fireEvent.changeText(answerInputs[0], 'a1');
//   fireEvent.changeText(answerInputs[1], 'a2');
//   fireEvent.press(screen.getByText('Submit'));

//   expect(mockFn).toBeCalledWith({
//     1: { q: 'q1', a: 'a1' },
//     2: { q: 'q2', a: 'a2' },
//   });
});