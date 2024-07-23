import { getDataSource } from "../../database";
import User from "./user";

describe("User", () => {
  beforeEach(async () => {
    const database = await getDataSource();
    for (const entity of database.entityMetadatas) {
      const repository = database.getRepository(entity.name);
      await repository.query(
        `TRUNCATE "${entity.tableName}" RESTART IDENTITY CASCADE;`,
      );
    }
  });

  afterAll(async () => {
    const database = await getDataSource();
    await database.destroy();
  });

  describe("getUserWithEmailAndPassword", () => {
    const { email, password } = {
      email: "me@test.com",
      password: "123456azerty",
    };

    describe("when email matches no user in database", () => {
      it("throws error", async () => {
        await expect(
          User.getUserWithEmailAndPassword({ email, password }),
        ).rejects.toThrow("INVALID_CREDENTIALS");
      });
    });

    describe("when email matches user in database", () => {
      describe("when password does not match password in database", () => {
        it("throws error", async () => {
          await User.saveNewUser({
            email,
            username: "Omar",
            password: "otherpassword",
            description: "",
            image: "",
          });

          await expect(
            User.getUserWithEmailAndPassword({ email, password }),
          ).rejects.toThrow("INVALID_CREDENTIALS");
        });
      });

      describe("when password matches password in database", () => {
        it("returns user", async () => {
          const user = await User.saveNewUser({
            email,
            username: "Omar",
            password,
            description: "",
            image: "",
          });

          const actualUser = await User.getUserWithEmailAndPassword({
            email,
            password,
          });

          expect(actualUser).toEqual({
            ...user,
            comments: [],
            likes: [],
            followers: [],
            followings: [],
          });

          await expect(
            User.getUserWithEmailAndPassword({ email, password })
          ).resolves.toEqual(user);
        });
      });
    });
  });

  describe("saveNewUser", () => {
    const { email, username, password, description } = {
      email: "me@test.com",
      username: "Thibaut",
      password: "123456azerty",
      description: "",
    };

    it("saves user and returns it", async () => {
      const user = await User.saveNewUser({
        email,
        username,
        password,
        description,
        image: "",
      });

      const actualUser = await User.getUserWithEmailAndPassword({
        email,
        password,
      });

      expect(actualUser).toEqual({
        ...user,
        comments: [],
        likes: [],
        followers: [],
        followings: [],
      });

      await expect(User.findOne({ where: { email } })).resolves.toEqual(user);
    });

    it("throws an error if email already exists", async () => {
      await User.saveNewUser({
        email,
        username: "Tom",
        password: "azerty123456",
        description: "",
        image: "",
      });

      await expect(
        User.saveNewUser({
          email,
          username: "Thibaut",
          password: "123456azerty",
          description: "",
          image: "",
        }),
      ).rejects.toThrow("EMAIL_ALREADY_USED");
    });
  });

  describe("modify password", () => {
    const { email, username, password, description } = {
      email: "me@test.com",
      username: "Tom",
      password: "azerty123456",
      description: "",
    };

    it("throws an error if email doesn't exist", async () => {
      await User.saveNewUser({
        email,
        username,
        password,
        description,
        image: "",
      });

      await expect(
        User.resetUser({ email: "other@gmail.com" }),
      ).rejects.toThrow("USER_NOT_FOUND");
    });
  });
});
