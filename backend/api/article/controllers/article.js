'use strict';
//const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    // GET /articles/published/?lang=es
    published: async ctx => {
    //ctx.send('Hello World!');
    //ctx.send( entities.map(entity => sanitizeEntity(entity, { model: strapi.models.article })) );
    //let entities = await strapi.services.article.find(ctx.query);
    //console.log('ctx', ctx)
      const result = await strapi.query('article').model.query(qb => {
        qb.where(`published_${ctx.query.lang}`, true);
      }).fetchAll();      
      ctx.send(result.toJSON());
    },
  };
  