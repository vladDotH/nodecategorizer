-- Up Migration
create table "Categories"
(
    id             uuid primary key        default gen_random_uuid(),
    slug           varchar unique not null,
    name           varchar        not null,
    description    text,
    createdDate    timestamp      not null default current_timestamp,
    active         bool           not null,

    name_ts        tsvector generated always as ( to_tsvector('english', name) ) stored,
    description_ts tsvector generated always as ( to_tsvector('english', description) ) stored
);

create index "Categories_slug_index" on "Categories" (slug);
create index "Categories_name_index" on "Categories" using gin (name_ts);
create index "Categories_description_index" on "Categories" using gin (description_ts);
create index "Categories_search_index" on "Categories" using gin (name_ts, description_ts);

-- Down Migration
drop table "Categories";
