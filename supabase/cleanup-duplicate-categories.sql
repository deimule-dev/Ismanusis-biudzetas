-- ═══════════════════════════════════════════════════════
-- PAŠALINTI PASIKARTOJANČIAS KATEGORIJAS
-- Supabase → SQL Editor → paleiskite VIENĄ KARTĄ
-- ═══════════════════════════════════════════════════════

-- 1. Operacijas perkeliame prie seniausios (mažiausio id) kategorijos
UPDATE transactions t
SET category_id = keepers.keep_id
FROM (
  SELECT
    name,
    type,
    MIN(id) AS keep_id
  FROM categories
  GROUP BY name, type
) keepers
JOIN categories c
  ON c.name = keepers.name
 AND c.type = keepers.type
WHERE t.category_id = c.id
  AND c.id <> keepers.keep_id;

-- 2. Ištriname dublikatus (paliekame po 1 kategoriją)
DELETE FROM categories c1
USING categories c2
WHERE c1.name = c2.name
  AND c1.type = c2.type
  AND c1.id > c2.id;

-- 3. Apsauga ateityje — neleidžia vėl sukurti dublikatų
ALTER TABLE categories
DROP CONSTRAINT IF EXISTS categories_name_type_unique;

ALTER TABLE categories
ADD CONSTRAINT categories_name_type_unique
UNIQUE (name, type);
