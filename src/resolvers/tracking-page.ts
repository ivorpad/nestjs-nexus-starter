import { schema } from 'nexus';

schema.objectType({
  name: 'TrackingPage',
  definition(t) {
    t.model.storeHost();
    t.model.name();
    t.model.description();
    t.model.email();
    t.model.storeId();
  },
});

schema.queryType({
  definition(t) {
    t.crud.trackingPages();

    t.field('publish', {
      type: 'TrackingPage',
      nullable: true,
    });
  },
});
