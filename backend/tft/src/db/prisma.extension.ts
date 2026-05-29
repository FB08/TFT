export const softDeleteExtension = {
  query: {
    user: {
      findMany({ args, query }) {
        args.where = {
          ...args.where,
          deletedAt: null,
        };

        return query(args);
      },


      findUnique({ args, query }) {
        return query({
          ...args,
          where: {
            ...args.where,
            deletedAt: null,
          },
        });
      },
    },
  },
};