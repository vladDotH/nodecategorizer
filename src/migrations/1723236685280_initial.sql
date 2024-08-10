-- Up Migration
create table "Categories"
(
    id             uuid primary key        default gen_random_uuid(),
    slug           varchar unique not null,
    name           varchar        not null,
    description    text,
    "createdDate"  timestamp      not null default current_timestamp,
    active         bool           not null
);

-- Down Migration
drop table "Categories";
