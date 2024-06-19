import logging

logging.basicConfig(
    format="%(asctime)s | %(levelname)s | %(pathname)s | %(lineno)d | %(message)s"
)
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)


def log(log_type="info", path="", cursor="", message="", uniqueId=""):

    if message != "":
        message = (
            "[APPLICATION]: KITS-FLASK"
            + " | "
            + "[API]: "
            + path
            + " | "
            + cursor
            + " | "
            + message
            + " | "
            + "UniqueId: "
            + uniqueId
        )
    else:
        message = (
            "[APPLICATION]: KITS-FLASK"
            + " | "
            + "[API]: "
            + path
            + " | "
            + cursor
            + " | "
            + "UniqueId: "
            + uniqueId
        )

    if log_type == "info":
        logger.info(message)
    elif log_type == "debug":
        logger.debug(message)
    elif log_type == "warning":
        logger.warning(message)
    else:
        logger.error(message)
