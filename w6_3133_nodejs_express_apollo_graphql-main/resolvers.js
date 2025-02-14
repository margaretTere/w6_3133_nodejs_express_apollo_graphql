const Movie = require('./models/Movie');

const resolver = {
    Query: {
        movies: async (parent, args, contextValue, info) => {
            return await Movie.find()
        },
        movie: async (_, { id }) => {
            return await Movie.findById(id)
        }
    },
    Mutation: {
        addMovie: async (_, args) => {
            // const newMovie = new Movie({
            //     ...args
            // })

            const newMovie = new Movie({
                name: args.name,
                director_name: args.director_name,
                production_house: args.production_house,
                release_date: args.release_date,
                rating: args.rating
            })

            const movie = await newMovie.save()
            return movie
        },
        updateMovie: async (_, { id, name, director_name, production_house, release_date, rating }) => {
            const movie = await Movie.findById(id);
            if (!movie) return null;

            if (name) movie.name = name;
            if (director_name) movie.director_name = director_name;
            if (production_house) movie.production_house = production_house;
            if (release_date) movie.release_date = release_date;
            if (rating) movie.rating = rating;

            return await movie.save();
        },
        deleteMovie: async (_, { id }) => {
            const movie = await Movie.findById(id);
            if (!movie) return null;

            await movie.remove();
            return movie; 
        }
    }
}

module.exports = resolver