// database/seeding.js

import dotenv from "dotenv";
dotenv.config();

import { faker } from "@faker-js/faker";
import argon2 from "argon2";

import pool from "../src/app/lib/db.js";

import avatars from "./services/avatars.js";
import films from "./services/films.js";
import categories from "./services/categories.js";
import users from "./services/users.js";

async function insertAvatars() {
  try {
    const queries = [];
    for (const avatar of avatars) {
      queries.push(
        pool.query("INSERT INTO `Avatar` (`avatar_url`) VALUES (?)", [
          avatar.avatar_url,
        ])
      );
    }
    await Promise.all(queries);
  } catch (err) {
    console.error("Error inserting avatars:", err.message);
    throw err;
  }
}

async function insertFilms() {
  try {
    const queries = [];
    for (const film of films) {
      // Insert only URL fields (miniature_url, cover_url, videoUrl) along with other film info.
      queries.push(
        pool.query(
          "INSERT INTO `Film` (`miniature_url`, `cover_url`, `title`, `videoUrl`, `duration`, `year`, `description`, `IsAvailable`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [
            film.miniature_url,
            film.cover_url,
            film.title,
            film.videoUrl,
            film.duration,
            film.year,
            film.description,
            film.IsAvailable,
          ]
        )
      );
    }
    await Promise.all(queries);
  } catch (err) {
    console.error("Error inserting films:", err.message);
    throw err;
  }
}

async function insertCategories() {
  try {
    const queries = [];
    for (const cat of categories) {
      queries.push(
        pool.query("INSERT INTO `Categorie` (`name`) VALUES (?)", [cat.name])
      );
    }
    await Promise.all(queries);
  } catch (err) {
    console.error("Error inserting categories:", err.message);
    throw err;
  }
}

async function insertAdmin() {
  const password = "admin";
  return argon2
    .hash(password)
    .then((hashed) =>
      pool.query(
        "INSERT INTO `User` (`name`, `email`, `naissance`, `civility`, `hashed_password`, `IsAdmin`, `avatarId`) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          "Admin",
          "admin@admin.admin",
          "2000-01-01",
          1,
          hashed,
          1,
          faker.number.int({ min: 1, max: avatars.length }),
        ]
      )
    )
    .catch((err) => {
      console.error("Error inserting admin:", err.message);
      throw err;
    });
}

async function insertUsers() {
  try {
    const queries = users.map(async (user) => {
      const hashedPassword = await argon2.hash(user.hashed_password);
      return pool.query(
        "INSERT INTO `User` (`name`, `email`, `naissance`, `civility`, `hashed_password`, `IsAdmin`, `avatarId`) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          user.name,
          user.email,
          user.naissance,
          user.civility,
          hashedPassword,
          user.IsAdmin,
          user.avatarId,
        ]
      );
    });
    await Promise.all(queries);
  } catch (err) {
    console.error("Error inserting users:", err.message);
    throw err;
  }
}

async function insertFilmCategorie() {
  try {
    const [filmsCountRow] = await pool.query(
      "SELECT COUNT(*) AS count FROM `Film`"
    );
    const [categoriesCountRow] = await pool.query(
      "SELECT COUNT(*) AS count FROM `Categorie`"
    );
    if (!filmsCountRow[0].count || !categoriesCountRow[0].count) {
      throw new Error(
        "Not enough data in Film or Categorie tables for seeding Categorie_par_film"
      );
    }
    const queries = [];
    for (let catIndex = 0; catIndex < categories.length; catIndex++) {
      const categoryId = catIndex + 1;
      const usedFilmIds = new Set();

      while (usedFilmIds.size < 7) {
        const filmId = faker.number.int({ min: 1, max: films.length });
        if (!usedFilmIds.has(filmId)) {
          usedFilmIds.add(filmId);
          const unique_key = `${filmId}-${categoryId}`;
          queries.push(
            pool.query(
              "INSERT INTO `Categorie_par_film` (`filmId`, `categorieId`, `unique_key`) VALUES (?, ?, ?)",
              [filmId, categoryId, unique_key]
            )
          );
        }
      }
    }
    await Promise.all(queries);
  } catch (err) {
    console.error("Error inserting film_categorie:", err.message);
    throw err;
  }
}

async function insertCommentaires() {
  try {
    const [filmsCountRow] = await pool.query(
      "SELECT COUNT(*) AS count FROM `Film`"
    );
    const [usersCountRow] = await pool.query(
      "SELECT COUNT(*) AS count FROM `User`"
    );
    const [avatarsCountRow] = await pool.query(
      "SELECT COUNT(*) AS count FROM `Avatar`"
    );
    const uniqueKeysCombinations = new Set();
    const queries = [];
    const totalOfUniqueKeysCombinations =
      users.length * films.length * avatars.length;

    if (
      usersCountRow[0].count &&
      filmsCountRow[0].count &&
      avatarsCountRow[0].count
    ) {
      while (
        uniqueKeysCombinations.size <
        faker.number.int({
          min: 0,
          max: Math.floor(totalOfUniqueKeysCombinations / 4 / 2 / 2 / 2),
        })
      ) {
        const userId = faker.number.int({ min: 1, max: users.length });
        const filmId = faker.number.int({ min: 1, max: films.length });
        const avatarId = faker.number.int({ min: 1, max: avatars.length });

        queries.push(
          pool.query(
            "INSERT INTO `Commentaire_film` (`userId`, `filmId`, `avatarId`, `content`, `date`, `unique_key`) VALUES (?, ?, ?, ?, ?, ?)",
            [
              userId,
              filmId,
              avatarId,
              faker.lorem.paragraph(),
              faker.date.past(),
              faker.string.uuid(),
            ]
          )
        );
      }
      await Promise.all(queries);
    } else {
      throw new Error(
        "Not enough data in User, Film or Avatar tables for seeding Commentaire_film"
      );
    }
  } catch (err) {
    console.error("Error inserting commentaires:", err.message);
    throw err;
  }
}

async function insertFilmsIntoWatchlist() {
  try {
    const [filmsCountRow] = await pool.query(
      "SELECT COUNT(*) AS count FROM `Film`"
    );
    const [usersCountRow] = await pool.query(
      "SELECT COUNT(*) AS count FROM `User`"
    );
    const uniqueKeysCombinations = new Set();
    const queries = [];
    const totalOfUniqueKeysCombinations = users.length * films.length;

    if (usersCountRow[0].count && filmsCountRow[0].count) {
      while (
        uniqueKeysCombinations.size <
        faker.number.int({
          min: 0,
          max: Math.floor(totalOfUniqueKeysCombinations / 4 / 2),
        })
      ) {
        const userId = faker.number.int({ min: 1, max: users.length });
        const filmId = faker.number.int({ min: 1, max: films.length });
        const unique_key = `${userId}-${filmId}`;

        if (!uniqueKeysCombinations.has(unique_key)) {
          uniqueKeysCombinations.add(unique_key);
          queries.push(
            pool.query(
              "INSERT INTO `Watchlist` (`userId`, `filmId`, `unique_key`) VALUES (?, ?, ?)",
              [userId, filmId, unique_key]
            )
          );
        }
      }
      await Promise.all(queries);
    } else {
      throw new Error(
        "Not enough data in User or Film tables for seeding Watchlist"
      );
    }
  } catch (err) {
    console.error("Error inserting films into watchlist:", err.message);
    throw err;
  }
}

async function insertFilmsIntoFavorites() {
  try {
    const [filmsCountRow] = await pool.query(
      "SELECT COUNT(*) AS count FROM `Film`"
    );
    const [usersCountRow] = await pool.query(
      "SELECT COUNT(*) AS count FROM `User`"
    );
    const uniqueKeysCombinations = new Set();
    const queries = [];
    const totalOfUniqueKeysCombinations = users.length * films.length;

    if (usersCountRow[0].count && filmsCountRow[0].count) {
      while (
        uniqueKeysCombinations.size <
        faker.number.int({
          min: 0,
          max: Math.floor(totalOfUniqueKeysCombinations / 4 / 2),
        })
      ) {
        const userId = faker.number.int({ min: 1, max: users.length });
        const filmId = faker.number.int({ min: 1, max: films.length });
        const unique_key = `${userId}-${filmId}`;

        if (!uniqueKeysCombinations.has(unique_key)) {
          uniqueKeysCombinations.add(unique_key);
          queries.push(
            pool.query(
              "INSERT INTO `Favori_film` (`userId`, `filmId`, `unique_key`) VALUES (?, ?, ?)",
              [userId, filmId, unique_key]
            )
          );
        }
      }
      await Promise.all(queries);
    } else {
      throw new Error(
        "Not enough data in User or Film tables for seeding Favorites"
      );
    }
  } catch (err) {
    console.error("Error inserting films into favorites:", err.message);
    throw err;
  }
}

async function seed() {
  try {
    await pool.query("SET FOREIGN_KEY_CHECKS = 0");
    await pool.query("TRUNCATE `Avatar`");
    await pool.query("TRUNCATE `Film`");
    await pool.query("TRUNCATE `Categorie`");
    await pool.query("TRUNCATE `User`");
    await pool.query("TRUNCATE `Categorie_par_film`");
    await pool.query("TRUNCATE `Commentaire_film`");
    await pool.query("TRUNCATE `Watchlist`");
    await pool.query("TRUNCATE `Favori_film`");

    await insertAvatars();
    await insertFilms();
    await insertCategories();
    await insertAdmin();
    await insertUsers();

    const [avatarsCountRow] = await pool.query(
      "SELECT COUNT(*) AS count FROM `Avatar`"
    );
    const [filmsCountRow] = await pool.query(
      "SELECT COUNT(*) AS count FROM `Film`"
    );
    const [categoriesCountRow] = await pool.query(
      "SELECT COUNT(*) AS count FROM `Categorie`"
    );
    const [usersCountRow] = await pool.query(
      "SELECT COUNT(*) AS count FROM `User`"
    );

    if (
      filmsCountRow[0].count >= films.length &&
      categoriesCountRow[0].count >= categories.length
    ) {
      await insertFilmCategorie();
    } else {
      throw new Error(
        "Not enough data in Film or Categorie tables for seeding Categorie_par_film"
      );
    }

    if (
      usersCountRow[0].count >= users.length &&
      filmsCountRow[0].count >= films.length &&
      avatarsCountRow[0].count >= avatars.length
    ) {
      await insertCommentaires();
    } else {
      throw new Error(
        "Not enough data in User or Film tables for seeding Commentaire_film"
      );
    }

    if (
      usersCountRow[0].count >= users.length &&
      filmsCountRow[0].count >= films.length
    ) {
      await insertFilmsIntoWatchlist();
      await insertFilmsIntoFavorites();
    }

    await pool.query("SET FOREIGN_KEY_CHECKS = 1");

    console.info(`${pool.name} filled from ${import.meta.url} 🌱`);
  } catch (err) {
    console.error("Error during database seeding:", err.message);
  } finally {
    pool.end();
  }
}

seed();
