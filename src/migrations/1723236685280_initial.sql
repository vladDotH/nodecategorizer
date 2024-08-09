-- Up Migration
create table "Category"
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

create index "Category_name_index" on "Category" using gin (name_ts);
create index "Category_description_index" on "Category" using gin (description_ts);
create index "Category_search_index" on "Category" using gin (name_ts, description_ts);

-- Down Migration
drop table "Category";
