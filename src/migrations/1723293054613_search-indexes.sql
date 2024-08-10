-- Up Migration
create extension unaccent;

create or replace function immutable_unaccent(text)
    returns text
    language sql
    immutable parallel safe as
$$
select public.unaccent('public.unaccent', $1);
$$;

create index "Categories_name_index" on "Categories" using gin (immutable_unaccent(name));
create index "Categories_description_index" on "Categories" using gin (immutable_unaccent(description));

-- Down Migration
drop index "Categories_name_index";
drop index "Categories_description_index";

drop function immutable_unaccent;

drop extension unaccent;