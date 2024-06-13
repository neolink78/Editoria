import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { SIGN_IN_FORM } from "../../hooks/form";
import { SignInMutation, SignInMutationVariables } from "@/gql/graphql";
import SignIn from "@/pages/sign-in";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({ useRouter: jest.fn() }));

describe("Sign in component", () => {
  const MOCK_SIGN_IN_FORM: MockedResponse<
    SignInMutation,
    SignInMutationVariables
  > = {
    request: {
      query: SIGN_IN_FORM,
      variables: {
        email: "test@example.com",
        password: "password1234",
      },
    },
    result: {
      data: {
        signIn: {
          email: "test@example.com",
          id: "123456",
          username: "Chloé",
          description: "",
        },
      },
    },
  };

  it("renders the SignIp form and signs up a user", async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push,
      query: {},
    }));

    await act(async () => {
      render(
        <MockedProvider mocks={[MOCK_SIGN_IN_FORM]}>
          <SignIn />
        </MockedProvider>,
      );
    });

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "password1234" },
    });

    await act(async () => {
      fireEvent.submit(screen.getByTestId("sign-in-button"));
    });

    await waitFor(() => {
      expect(push).toHaveBeenCalledTimes(1);
      expect(push).toHaveBeenCalledWith("/user/account");
    });
  });

  it("displays validation messages when required fields are not filled", async () => {
    await act(async () => {
      render(
        <MockedProvider>
          <SignIn />
        </MockedProvider>,
      );
    });

    await act(async () => {
      fireEvent.submit(screen.getByTestId("sign-in-button"));
    });

    expect(screen.getByText(/email required/i)).toBeInTheDocument();
    expect(screen.getByText(/password required/i)).toBeInTheDocument();
  });
});
