from sqlalchemy import create_engine, text
engine = create_engine("sqlite+pysqlite:///data.db", echo=True, future=True)

with engine.connect() as conn:
	result = conn.execute(text("SELECT * FROM sentences;"))
	print(result.all())

