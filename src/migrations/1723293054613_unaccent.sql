-- Up Migration
create extension unaccent;

create or replace function immutable_unaccent(text)
    returns text
    language sql
    immutable parallel safe as
$$
select public.unaccent('public.unaccent', $1);
$$;

alter table "Categories"
    drop column name_ts;
alter table "Categories"
    drop column description_ts;

alter table "Categories"
    add column name_ts tsvector generated always as
        ( to_tsvector('english', name) || to_tsvector('russian', immutable_unaccent(name)) ) stored;
alter table "Categories"
    add column description_ts tsvector generated always as
        ( to_tsvector('english', description) || to_tsvector('russian', immutable_unaccent(description)) ) stored;

-- Down Migration
alter table "Categories"
    drop column name_ts;
alter table "Categories"
    drop column description_ts;

alter table "Categories"
    add column name_ts tsvector generated always as
        (to_tsvector('english', name) ) stored;
alter table "Categories"
    add column description_ts tsvector generated always as
        ( to_tsvector('english', description)) stored;

drop function immutable_unaccent;

drop extension unaccent;