import {
  fireEvent,
  render,
  screen,
  waitFor,
  act
} from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { SIGN_IN_FORM, SIGN_UP_FORM } from "../../hooks/form";
import {
  SignInMutation,
  SignInMutationVariables,
  SignUpMutation,
  SignUpMutationVariables
} from "@/gql/graphql";
import SignUp from "@/pages/sign-up";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({ useRouter: jest.fn() }));

describe("Sign up component", () => {
  const MOCK_SIGN_UP_FORM: MockedResponse<
    SignUpMutation,
    SignUpMutationVariables
  > = {
    request: {
      query: SIGN_UP_FORM,
      variables: {
        email: "test@example.com",
        username: "Chloé",
        password: "password1234"
      }
    },
    result: {
      data: {
        signUp: {
          email: "test@example.com"
        }
      }
    }
  };

  const MOCK_SIGN_IN_FORM: MockedResponse<
    SignInMutation,
    SignInMutationVariables
  > = {
    request: {
      query: SIGN_IN_FORM,
      variables: {
        email: "test@example.com",
        password: "password1234"
      }
    },
    result: {
      data: {
        signIn: {
          email: "test@example.com",
          id: "123456",
          username: "Chloé",
          description: ""
        }
      }
    }
  };

  it("renders the SignUp form and signs up a user", async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({ push }));

    await act(async () => {
      render(
        <MockedProvider mocks={[MOCK_SIGN_UP_FORM, MOCK_SIGN_IN_FORM]}>
          <SignUp />
        </MockedProvider>
      );
    });

    fireEvent.change(screen.getByPlaceholderText(/pseudo/i), {
      target: { value: "Chloé" }
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@example.com" }
    });
    fireEvent.change(screen.getAllByPlaceholderText("Password")[0], {
      target: { value: "password1234" }
    });
    fireEvent.change(screen.getByPlaceholderText(/confirm password/i), {
      target: { value: "password1234" }
    });

    await act(async () => {
      fireEvent.submit(screen.getByTestId("sign-up-button"));
    });

    await waitFor(() => {
      expect(push).toHaveBeenCalledTimes(1);
      expect(push).toHaveBeenCalledWith("/user/account");
    });
  });

  it("shows validation errors when required fields are missing", async () => {
    await act(async () => {
      render(
        <MockedProvider mocks={[MOCK_SIGN_UP_FORM, MOCK_SIGN_IN_FORM]}>
          <SignUp />
        </MockedProvider>
      );
    });

    await act(async () => {
      fireEvent.submit(screen.getByTestId("sign-up-button"));
    });

    expect(screen.getByText(/Username required/i)).toBeInTheDocument();
    expect(screen.getByText(/Email required/i)).toBeInTheDocument();
    expect(screen.getByText(/Password required/i)).toBeInTheDocument();
  });

  it("shows error when passwords do not match", async () => {
    await act(async () => {
      render(
        <MockedProvider mocks={[MOCK_SIGN_UP_FORM, MOCK_SIGN_IN_FORM]}>
          <SignUp />
        </MockedProvider>
      );
    });

    fireEvent.change(screen.getByPlaceholderText(/pseudo/i), {
      target: { value: "Chloé" }
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@example.com" }
    });
    fireEvent.change(screen.getAllByPlaceholderText("Password")[0], {
      target: { value: "password1234" }
    });
    fireEvent.change(screen.getByPlaceholderText(/confirm password/i), {
      target: { value: "differentpassword" }
    });

    await act(async () => {
      fireEvent.submit(screen.getByTestId("sign-up-button"));
    });

    expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
  });
});
