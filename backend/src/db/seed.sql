INSERT INTO users (email, name, password_hash) VALUES
  ('anna@example.com', 'Anna', 'x'),
  ('bruno@example.com', 'Bruno', 'x'),
  ('carla@example.com', 'Carla', 'x');

INSERT INTO expense_groups (name, created_by) VALUES ('Casa Via Roma', 1);

INSERT INTO group_members (group_id, user_id) VALUES (1, 1), (1, 2), (1, 3);

INSERT INTO expenses (group_id, paid_by, description, amount_cents) VALUES
  (1, 1, 'Spesa supermercato', 6000),
  (1, 2, 'Bolletta luce', 9000);

INSERT INTO expense_shares (expense_id, user_id, share_cents) VALUES
  (1, 1, 2000), (1, 2, 2000), (1, 3, 2000),
  (2, 1, 3000), (2, 2, 3000), (2, 3, 3000);