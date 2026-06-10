-- Paleiskite Supabase SQL Editor (vieną kartą)
-- Jei kategorijos jau yra, nieko nepridės

INSERT INTO categories (name, type)
SELECT v.name, v.type
FROM (
  VALUES
    ('Atlyginimas', 'income'),
    ('Laisvai samdomas darbas', 'income'),
    ('Maistas', 'expense'),
    ('Transportas', 'expense'),
    ('Pirkimai', 'expense'),
    ('Pramogos', 'expense'),
    ('Komunalinės paslaugos', 'expense')
) AS v(name, type)
WHERE NOT EXISTS (
  SELECT 1
  FROM categories c
  WHERE c.name = v.name
    AND c.type = v.type
);
